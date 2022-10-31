from django.db import models
from accounts.models import Account

# Create your models here.

class Block(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    topic = models.CharField(max_length=200)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.topic


class Event(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    start = models.DateField()
    end = models.DateField()
    allDay = models.BooleanField(default=True)

    def __str__(self):
        return self.title