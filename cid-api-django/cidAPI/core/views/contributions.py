from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.commit import Commit
from ..serializers import CommitSerializer

from django.contrib.auth.models import User

class Contributions(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    serializer_class = CommitSerializer

    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        return Commit.objects.filter(commited_by_id__in=[user_pk])

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(request.data, kwargs)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # FIXME: this is a bad way to set the value, but ...
        user_id = self.kwargs["pk"]
        user = User.objects.get(id=user_id)
        serializer.validated_data['commited_by'] = user

        serializer.save()

