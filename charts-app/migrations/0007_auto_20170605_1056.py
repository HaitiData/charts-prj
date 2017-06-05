# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charts-app', '0006_auto_20170605_0808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='category',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='chart',
            name='quantity',
            field=models.CharField(max_length=200),
        ),
    ]
