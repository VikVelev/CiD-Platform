# Generated by Django 2.0.2 on 2018-02-20 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_auth', '0013_auto_20180220_1003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='model3d',
            name='filename',
            field=models.FileField(upload_to=''),
        ),
    ]
