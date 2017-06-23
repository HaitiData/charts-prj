from django.db import models
from django.core.urlresolvers import reverse

from geonode.layers.models import Layer


class Chart(models.Model):
    CHART_TYPES = (
        (0, 'Bar chart'),
        (1, 'Pie chart'),
        (2, 'Donut chart')
    )

    AGGREGATION_TYPES = (
        (0, 'Sum'),
        (1, 'Mean'),
        (2, 'Category count'),
        (3, 'Max'),
        (4, 'Min'),
    )

    layer = models.ForeignKey(Layer)
    title = models.CharField(max_length=128, blank=True)
    category = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    type = models.SmallIntegerField(choices=CHART_TYPES, default=0)
    aggr_type = models.SmallIntegerField(choices=AGGREGATION_TYPES, default=3)
    abstract = models.TextField(blank=True)

    def get_absolute_url(self):
        return reverse('chart_detail', kwargs={'pk': self.pk})


