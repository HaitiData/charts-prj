from django.conf.urls import url

from . import views

urlpatterns = [url(r'^sample_csv$', views.get_csv, name='get_csv'),
               url(r'^sample_csv2$', views.get_csv_aggr, name='get_csv2'),
               url(r'^pie_chart_v1$', views.pie_chart_v1),
               url(r'^donut_chart_v1$', views.donut_chart_v1),
               url(r'^pie_chart_v2$', views.pie_chart_v2),
               url(r'^donut_chart_v2$', views.donut_chart_v2)
               ]
