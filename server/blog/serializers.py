from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'published', 'author', 'author_name', 'created_at', 'updated_at']
        read_only_fields = ['author', 'author_name', 'created_at', 'updated_at']
