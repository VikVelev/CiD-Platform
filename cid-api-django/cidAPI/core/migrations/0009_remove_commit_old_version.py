# Generated by Django 2.0.3 on 2018-03-08 00:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_commit_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commit',
            name='old_version',
        ),
    ]
