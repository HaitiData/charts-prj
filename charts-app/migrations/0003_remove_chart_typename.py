# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts-app', '0002_chart_layer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chart',
            name='typename',
        ),
    ]
