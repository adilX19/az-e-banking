from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    return JsonResponse({"username": request.user.username, "email": request.user.email})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        print(refresh_token)
        token = RefreshToken(refresh_token)
        token.blacklist()
        return JsonResponse({"message": "Logged out successfully"}, status=200)
    except Exception as e:
        print(str(e))
        return JsonResponse({"error": str(e)}, status=400)