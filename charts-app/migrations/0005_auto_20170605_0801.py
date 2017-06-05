# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts-app', '0004_auto_20170605_0800'),
    ]

    operations = [
        migrations.AddField(
            model_name='chart',
            name='aggr_type',
            field=models.SmallIntegerField(default=0, choices=[(0, b'Sum'), (1, b'Mean'), (2, b'Category count'), (3, b'Max'), (4, b'Min')]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chart',
            name='type',
            field=models.SmallIntegerField(default=0, choices=[(0, b'Bar chart'), (1, b'Pie chart'), (2, b'Donut chart')]),
        ),
    ]
