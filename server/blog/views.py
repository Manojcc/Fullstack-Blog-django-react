from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied
from .models import Blog
from .serializers import BlogSerializer
from .permissions import IsOwnerOrReadOnly


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = Blog.objects.order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.filter(published=True)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if not user or not user.is_authenticated:
            raise PermissionDenied("Authentication required to create a blog.")
        serializer.save(author=user)
