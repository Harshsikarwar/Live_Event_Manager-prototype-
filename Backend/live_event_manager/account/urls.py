from django.urls import path
from .views import signup, login, logout,current_user

urlpatterns = [

    path('signup/', signup),
    path('login/', login),
    path('logout/', logout),
    path("user/", current_user)
]