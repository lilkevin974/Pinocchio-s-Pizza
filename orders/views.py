import json

from django import forms
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from allauth.account.forms import LoginForm
from django.views.generic import TemplateView

from .models import Topping, Pizza

# Create your views here.
def index(request):

    context={
        "toppings":Topping.objects.all()
    }

    if request.method == 'POST':
            if request.user.is_authenticated:
                data = json.loads(request.body)
                print(request.body)
                order=Pizza.objects.filter(pizza=data['type'], size=data['size'], toppings=data['toppings'])
                print(order)
                price=order[0].price
                print(price)
                
                return HttpResponse(price)
            else:
                return HttpResponse('non-connected')
    

    return render(request, "orders/index.html", context)

    
""" class MyCustomLoginForm(LoginForm):
    template_name = "orders/login"
    def login(self, *args, **kwargs):

        # Add your own processing here.
        self.fields['login'].widget = forms.TextInput(attrs={'type': 'email', 'class': 'yourclass'})
        self.fields['password'].widget = forms.PasswordInput(attrs={'class': 'yourclass'})
       

        # You must return the original result.
        return super(MyCustomLoginForm, self).login(*args, **kwargs) """
