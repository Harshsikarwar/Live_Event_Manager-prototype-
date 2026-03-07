from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SignupSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def signup(request):

    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)

        return Response({
            "token": token.key,
            "message": "User created successfully"
        })

    return Response(serializer.errors)

@api_view(['POST'])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username,password=password)

    if user:

        token = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "message": "Login successful"
        })

    return Response({"error":"Invalid credentials"})

@api_view(['POST'])
def logout(request):

    request.user.auth_token.delete()

    return Response({"message":"Logged out successfully"})