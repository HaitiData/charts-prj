# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('typename', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=200)),
                ('quantity', models.CharField(max_length=200)),
                ('type', models.CharField(max_length=200)),
                ('aggr_type', models.CharField(max_length=200)),
            ],
        ),
    ]
