# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts-app', '0005_auto_20170605_0801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='aggr_type',
            field=models.SmallIntegerField(default=3, choices=[(0, b'Sum'), (1, b'Mean'), (2, b'Category count'), (3, b'Max'), (4, b'Min')]),
        ),
        migrations.AlterField(
            model_name='chart',
            name='category',
            field=models.CharField(max_length=200, choices=[(b'category', b'category')]),
        ),
        migrations.AlterField(
            model_name='chart',
            name='quantity',
            field=models.CharField(max_length=200, choices=[(b'quantity', b'quantity')]),
        ),
    ]
