from django.db import models
from accounts.models import Account

# Create your models here.

class Block(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    topic = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.topic