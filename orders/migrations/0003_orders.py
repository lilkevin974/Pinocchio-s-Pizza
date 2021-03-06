# Generated by Django 3.0.7 on 2020-06-29 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_topping'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=32)),
                ('pizza', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.Pizza')),
                ('topping1', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='topping1', to='orders.Topping')),
                ('topping2', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='topping2', to='orders.Topping')),
                ('topping3', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='topping3', to='orders.Topping')),
            ],
        ),
    ]
