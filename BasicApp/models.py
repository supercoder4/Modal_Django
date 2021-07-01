from django.db import models
from django.db.models.fields import CharField

# Create your models here.
class Picture(models.Model):
    item = models.ImageField(upload_to='images/')
    info = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)