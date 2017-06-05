# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts-app', '0003_remove_chart_typename'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chart',
            name='aggr_type',
        ),
        migrations.RemoveField(
            model_name='chart',
            name='type',
        ),
    ]
