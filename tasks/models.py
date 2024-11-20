from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    # What will be showed for every task on admin panel
    def __str__(self):
        return (f"#{self.id}: {self.title}")
