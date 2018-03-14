from django.db import models
from django.utils import timezone
from django.conf import settings


class Commit(models.Model):
    # if a model is deleted delete it's commits too?
    title = models.CharField(max_length=64)
    belongs_to_model = models.ForeignKey("Model3D", related_name='commits', on_delete=models.CASCADE, null=True)
    new_version = models.FileField(null=False, blank=False)
    new_textures = models.FileField(null=True, blank=True)
    #If a user is deleted, delete all commits.
    commited_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    details = models.TextField(null=True)

    date = models.DateTimeField(auto_now_add=True)