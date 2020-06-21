import json

from django.http import HttpResponse
from django.shortcuts import render

from .models import Topping, Pizza

# Create your views here.
def index(request):

    context={
        "toppings":Topping.objects.all()
    }

    if request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        order=Pizza.objects.filter(pizza=data['type'], size=data['size'], toppings=data['toppings'])
        price=order[0].price

        return HttpResponse(price)

    return render(request, "orders/index.html", context)


