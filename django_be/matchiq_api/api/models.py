from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.EmailField(max_length=50)
    passwordHash = models.CharField(max_length=255)
    lastLogin = models.DateTimeField()

    class Meta:
        db_table = 'user'

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    postedDate = models.DateTimeField()
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('CLOSED', 'Closed'),
        ('PAUSED', 'Paused')
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN'
    )

    class Meta:
        db_table = 'job'

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicationDate = models.DateTimeField()
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected')
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    resume = models.TextField()
    coverLetter = models.TextField()

    class Meta:
        db_table = 'application'

