# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('layers', '24_to_26'),
        ('charts-app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chart',
            name='layer',
            field=models.ForeignKey(default=1, to='layers.Layer'),
            preserve_default=False,
        ),
    ]
