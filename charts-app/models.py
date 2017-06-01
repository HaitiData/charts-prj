from django.db import models
from django.core.urlresolvers import reverse


class Chart(models.Model):
    typename = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    aggr_type = models.CharField(max_length=200)

    def get_absolute_url(self):
        return reverse('chart_update', kwargs={'pk': self.pk})
