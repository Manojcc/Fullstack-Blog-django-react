from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blogs/', include('blog.urls')),
    path('api/auth/', include('users.urls')),

    # ✅ React frontend catch-all
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]
