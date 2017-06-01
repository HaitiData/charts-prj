from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from geonode.urls import *

urlpatterns = patterns('',
   url(r'^/?$',
       TemplateView.as_view(template_name='site_index.html'),
       name='home'),
 ) + urlpatterns + [
    url(r'^chart/', include('charts-app.urls')),
    url(r'^table/', include('wfs-harvest.urls')),
    ]
