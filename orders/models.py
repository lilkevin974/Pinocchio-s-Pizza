from django.db import models

# Create your models here.

class Pizza(models.Model):
    code=models.CharField(max_length=3)
    pizza=models.CharField(max_length=10)
    size=models.CharField(max_length=5)
    toppings=models.IntegerField()
    price=models.DecimalField(max_digits=4,decimal_places=2)

    def __str__(self):
        return f"{self.size} {self.pizza} Pizza with {self.toppings}"

class Topping(models.Model):
    topping=models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.topping}"

class Order(models.Model):
    user=models.CharField(max_length=32)
    pizza=models.ForeignKey(Pizza, on_delete=models.PROTECT)
    topping1=models.ForeignKey(Topping, on_delete=models.PROTECT,blank=True, null=True, related_name="topping1")
    topping2=models.ForeignKey(Topping, on_delete=models.PROTECT,blank=True, null=True, related_name="topping2")
    topping3=models.ForeignKey(Topping, on_delete=models.PROTECT,blank=True, null=True, related_name="topping3")

    def __str__(self):
        return f"{self.user} orders a {self.pizza} topping(s) : {self.topping1}, {self.topping2} and {self.topping3} "
