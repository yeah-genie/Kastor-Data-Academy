import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FilesTab extends ConsumerStatefulWidget {
  const FilesTab({super.key});

  @override
  ConsumerState<FilesTab> createState() => _FilesTabState();
}

class _FilesTabState extends ConsumerState<FilesTab> {
  String _selectedCategory = 'all';

  final List<_FileItem> _files = [
    _FileItem(
      name: 'server_logs_020823.txt',
      type: 'log',
      category: 'evidence',
      size: '2.4 MB',
      importance: 'critical',
    ),
    _FileItem(
      name: 'email_correspondence.eml',
      type: 'email',
      category: 'evidence',
      size: '156 KB',
      importance: 'high',
    ),
    _FileItem(
      name: 'suspect_interview_notes.pdf',
      type: 'document',
      category: 'evidence',
      size: '892 KB',
      importance: 'high',
    ),
    _FileItem(
      name: 'security_camera_footage.mp4',
      type: 'video',
      category: 'media',
      size: '45.2 MB',
      importance: 'medium',
    ),
    _FileItem(
      name: 'employee_records.xlsx',
      type: 'data',
      category: 'records',
      size: '1.1 MB',
      importance: 'medium',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final filteredFiles = _selectedCategory == 'all'
        ? _files
        : _files.where((f) => f.category == _selectedCategory).toList();

    return Column(
      children: [
        // Category filters
        _buildCategoryFilters(),

        // Files list
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: filteredFiles.length,
            itemBuilder: (context, index) {
              return _buildFileItem(filteredFiles[index]);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryFilters() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.3),
        border: Border(
          bottom: BorderSide(
            color: Colors.white.withOpacity(0.1),
            width: 1,
          ),
        ),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            _buildCategoryChip('all', '전체', _files.length),
            const SizedBox(width: 8),
            _buildCategoryChip(
                'evidence',
                '증거',
                _files.where((f) => f.category == 'evidence').length),
            const SizedBox(width: 8),
            _buildCategoryChip('media', '미디어',
                _files.where((f) => f.category == 'media').length),
            const SizedBox(width: 8),
            _buildCategoryChip('records', '기록',
                _files.where((f) => f.category == 'records').length),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryChip(String category, String label, int count) {
    final isSelected = _selectedCategory == category;

    return InkWell(
      onTap: () {
        setState(() {
          _selectedCategory = category;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? const Color(0xFF6366F1).withOpacity(0.2)
              : Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected
                ? const Color(0xFF6366F1)
                : Colors.white.withOpacity(0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Text(
              label,
              style: TextStyle(
                color: isSelected ? const Color(0xFF6366F1) : Colors.white70,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: isSelected
                    ? const Color(0xFF6366F1)
                    : Colors.white.withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '$count',
                style: TextStyle(
                  color: isSelected ? Colors.white : Colors.white70,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFileItem(_FileItem file) {
    IconData icon;
    Color iconColor;

    switch (file.type) {
      case 'log':
        icon = Icons.text_snippet;
        iconColor = const Color(0xFF6366F1);
        break;
      case 'email':
        icon = Icons.email;
        iconColor = const Color(0xFF3B82F6);
        break;
      case 'document':
        icon = Icons.description;
        iconColor = const Color(0xFFF59E0B);
        break;
      case 'video':
        icon = Icons.videocam;
        iconColor = const Color(0xFFEF4444);
        break;
      case 'data':
        icon = Icons.table_chart;
        iconColor = const Color(0xFF10B981);
        break;
      default:
        icon = Icons.insert_drive_file;
        iconColor = Colors.grey;
    }

    Color importanceColor;
    switch (file.importance) {
      case 'critical':
        importanceColor = const Color(0xFFEF4444);
        break;
      case 'high':
        importanceColor = const Color(0xFFF59E0B);
        break;
      default:
        importanceColor = const Color(0xFF6B7280);
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      color: Colors.white.withOpacity(0.05),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: Colors.white.withOpacity(0.1),
          width: 1,
        ),
      ),
      child: InkWell(
        onTap: () {
          _showFileDetail(file);
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: iconColor.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: iconColor, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      file.name,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      file.size,
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.5),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: importanceColor.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  file.importance.toUpperCase(),
                  style: TextStyle(
                    color: importanceColor,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Icon(
                Icons.chevron_right,
                color: Colors.white.withOpacity(0.3),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showFileDetail(_FileItem file) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E1B4B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              file.name,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              '파일 크기: ${file.size}',
              style: TextStyle(color: Colors.white.withOpacity(0.7)),
            ),
            Text(
              '중요도: ${file.importance}',
              style: TextStyle(color: Colors.white.withOpacity(0.7)),
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.visibility),
                    label: const Text('보기'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF6366F1),
                      padding: const EdgeInsets.all(16),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.bookmark),
                    label: const Text('저장'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: const BorderSide(color: Colors.white),
                      padding: const EdgeInsets.all(16),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _FileItem {
  final String name;
  final String type;
  final String category;
  final String size;
  final String importance;

  _FileItem({
    required this.name,
    required this.type,
    required this.category,
    required this.size,
    required this.importance,
  });
}
