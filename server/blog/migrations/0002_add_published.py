from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='published',
            field=models.BooleanField(default=True),
        ),
    ]
