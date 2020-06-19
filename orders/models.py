from django.db import models

# Create your models here.

class Pizza(models.Model):
    code=models.CharField(max_length=3)
    pizza=models.CharField(max_length=10)
    size=models.CharField(max_length=5)
    toppings=models.IntegerField()
    price=models.DecimalField(max_digits=4,decimal_places=2)

    def __str__(self):
        return f"{self.size} {self.pizza} Pizza with {self.toppings} toppings ({self.code}) costs {self.price}$"

class Topping(models.Model):
    topping=models.CharField(max_length=20)
    
    def __str__(self):
        return f"The topping number {self.id} is {self.topping}"
