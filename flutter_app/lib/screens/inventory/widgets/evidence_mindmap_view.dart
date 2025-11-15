import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../../models/evidence.dart';

class EvidenceMindMapView extends StatefulWidget {
  final List<Evidence> evidences;
  final List<Evidence> allEvidences;
  final Function(Evidence) onEvidenceTap;

  const EvidenceMindMapView({
    super.key,
    required this.evidences,
    required this.allEvidences,
    required this.onEvidenceTap,
  });

  @override
  State<EvidenceMindMapView> createState() => _EvidenceMindMapViewState();
}

class _EvidenceMindMapViewState extends State<EvidenceMindMapView> {
  final TransformationController _transformationController =
      TransformationController();
  
  String? _selectedNodeId;

  @override
  void dispose() {
    _transformationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Background grid
        CustomPaint(
          size: Size.infinite,
          painter: GridPainter(),
        ),

        // Mind map canvas
        InteractiveViewer(
          transformationController: _transformationController,
          boundaryMargin: const EdgeInsets.all(1000),
          minScale: 0.5,
          maxScale: 3.0,
          child: SizedBox(
            width: 2000,
            height: 2000,
            child: CustomPaint(
              painter: ConnectionLinePainter(
                evidences: widget.evidences,
                allEvidences: widget.allEvidences,
                selectedNodeId: _selectedNodeId,
              ),
              child: Stack(
                children: _buildNodes(),
              ),
            ),
          ),
        ),

        // Controls
        Positioned(
          bottom: 20,
          right: 20,
          child: _buildControls(),
        ),
      ],
    );
  }

  List<Widget> _buildNodes() {
    final nodes = <Widget>[];
    final centerX = 1000.0;
    final centerY = 1000.0;
    final radius = 300.0;

    for (int i = 0; i < widget.evidences.length; i++) {
      final evidence = widget.evidences[i];
      final angle = (2 * math.pi / widget.evidences.length) * i;
      final x = centerX + radius * math.cos(angle) - 75; // 75 = half of node width
      final y = centerY + radius * math.sin(angle) - 60; // 60 = half of node height

      nodes.add(
        Positioned(
          left: x,
          top: y,
          child: _MindMapNode(
            evidence: evidence,
            isSelected: _selectedNodeId == evidence.id,
            onTap: () {
              setState(() {
                _selectedNodeId = evidence.id;
              });
              widget.onEvidenceTap(evidence);
            },
          ),
        ),
      );
    }

    return nodes;
  }

  Widget _buildControls() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252A3E),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFF00D9FF).withOpacity(0.3),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            onPressed: () {
              final matrix = _transformationController.value.clone();
              matrix.scale(1.2);
              _transformationController.value = matrix;
            },
            icon: const Icon(Icons.add, color: Color(0xFF00D9FF)),
            tooltip: 'Zoom In',
          ),
          Container(
            width: 40,
            height: 1,
            color: const Color(0xFF00D9FF).withOpacity(0.3),
          ),
          IconButton(
            onPressed: () {
              final matrix = _transformationController.value.clone();
              matrix.scale(0.8);
              _transformationController.value = matrix;
            },
            icon: const Icon(Icons.remove, color: Color(0xFF00D9FF)),
            tooltip: 'Zoom Out',
          ),
          Container(
            width: 40,
            height: 1,
            color: const Color(0xFF00D9FF).withOpacity(0.3),
          ),
          IconButton(
            onPressed: () {
              _transformationController.value = Matrix4.identity();
            },
            icon: const Icon(Icons.center_focus_strong, color: Color(0xFF00D9FF)),
            tooltip: 'Center',
          ),
        ],
      ),
    );
  }
}

class _MindMapNode extends StatefulWidget {
  final Evidence evidence;
  final bool isSelected;
  final VoidCallback onTap;

  const _MindMapNode({
    required this.evidence,
    required this.isSelected,
    required this.onTap,
  });

  @override
  State<_MindMapNode> createState() => _MindMapNodeState();
}

class _MindMapNodeState extends State<_MindMapNode> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final hasRelations = widget.evidence.relatedEvidence != null &&
        widget.evidence.relatedEvidence!.isNotEmpty;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: 150,
          height: 120,
          decoration: BoxDecoration(
            color: const Color(0xFF252A3E),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: widget.isSelected
                  ? const Color(0xFF00D9FF)
                  : (_isHovered
                      ? const Color(0xFF00D9FF).withOpacity(0.6)
                      : const Color(0xFF00D9FF).withOpacity(0.3)),
              width: widget.isSelected ? 3 : (_isHovered ? 2 : 1),
            ),
            boxShadow: [
              BoxShadow(
                color: widget.isSelected
                    ? const Color(0xFF00D9FF).withOpacity(0.5)
                    : (_isHovered
                        ? const Color(0xFF00D9FF).withOpacity(0.3)
                        : Colors.black.withOpacity(0.3)),
                blurRadius: widget.isSelected ? 16 : (_isHovered ? 12 : 8),
                spreadRadius: widget.isSelected ? 2 : 0,
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icon
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF00D9FF).withOpacity(0.2),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    _getTypeIcon(widget.evidence.type),
                    style: const TextStyle(fontSize: 24),
                  ),
                ),
                const SizedBox(height: 8),

                // Title
                Text(
                  widget.evidence.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),

                // Connection indicator
                if (hasRelations) ...[
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.link,
                        size: 10,
                        color: const Color(0xFF00D9FF).withOpacity(0.7),
                      ),
                      const SizedBox(width: 2),
                      Text(
                        widget.evidence.relatedEvidence!.length.toString(),
                        style: TextStyle(
                          fontSize: 10,
                          color: const Color(0xFF00D9FF).withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _getTypeIcon(String type) {
    switch (type.toLowerCase()) {
      case 'graph':
      case 'data':
        return '📊';
      case 'log':
        return '📝';
      case 'profile':
        return '👤';
      case 'email':
        return '📧';
      case 'document':
        return '📄';
      default:
        return '🔍';
    }
  }
}

class ConnectionLinePainter extends CustomPainter {
  final List<Evidence> evidences;
  final List<Evidence> allEvidences;
  final String? selectedNodeId;

  ConnectionLinePainter({
    required this.evidences,
    required this.allEvidences,
    this.selectedNodeId,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF00D9FF).withOpacity(0.3)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final selectedPaint = Paint()
      ..color = const Color(0xFF00D9FF)
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final centerX = 1000.0;
    final centerY = 1000.0;
    final radius = 300.0;

    // Draw connections
    for (int i = 0; i < evidences.length; i++) {
      final evidence = evidences[i];
      if (evidence.relatedEvidence == null || evidence.relatedEvidence!.isEmpty) {
        continue;
      }

      final angle1 = (2 * math.pi / evidences.length) * i;
      final x1 = centerX + radius * math.cos(angle1);
      final y1 = centerY + radius * math.sin(angle1);

      for (final relatedId in evidence.relatedEvidence!) {
        final relatedIndex = evidences.indexWhere((e) => e.id == relatedId);
        if (relatedIndex == -1) continue;

        final angle2 = (2 * math.pi / evidences.length) * relatedIndex;
        final x2 = centerX + radius * math.cos(angle2);
        final y2 = centerY + radius * math.sin(angle2);

        final isHighlighted =
            selectedNodeId == evidence.id || selectedNodeId == relatedId;

        canvas.drawLine(
          Offset(x1, y1),
          Offset(x2, y2),
          isHighlighted ? selectedPaint : paint,
        );
      }
    }
  }

  @override
  bool shouldRepaint(ConnectionLinePainter oldDelegate) {
    return selectedNodeId != oldDelegate.selectedNodeId;
  }
}

class GridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF00D9FF).withOpacity(0.05)
      ..strokeWidth = 1;

    const gridSize = 50.0;

    // Draw vertical lines
    for (double x = 0; x < size.width; x += gridSize) {
      canvas.drawLine(
        Offset(x, 0),
        Offset(x, size.height),
        paint,
      );
    }

    // Draw horizontal lines
    for (double y = 0; y < size.height; y += gridSize) {
      canvas.drawLine(
        Offset(0, y),
        Offset(size.width, y),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
