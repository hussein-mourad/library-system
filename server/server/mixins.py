from django.db import transaction
from myauth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class BulkActionsMixin(viewsets.GenericViewSet):
    @action(methods=["GET"], detail=False)
    def bulk_list(self, request):
        ids = request.query_params.getlist("id", [])
        list_objects = self.queryset.filter(pk__in=ids)
        page = self.paginate_queryset(list_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(list_objects, many=True)
        return Response(serializer.data)

    @action(methods=["DELETE"], detail=False)
    def bulk_delete(self, request):
        delete_ids = request.query_params.getlist("id", [])
        delete_objects = self.queryset.filter(pk__in=delete_ids)
        delete_objects.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=["PUT"], detail=False)
    def bulk_update(self, request):
        user_ids = request.query_params.getlist("id", [])
        data = request.data

        with transaction.atomic():
            updated_users = []
            for user_id in user_ids:
                user_instance = self.get_object_or_none(User.objects.all(), pk=user_id)
                if user_instance:
                    serializer = self.get_serializer(
                        user_instance, data=data, partial=True
                    )
                    serializer.is_valid(raise_exception=True)
                    updated_users.append(serializer.save())

        serializer = self.get_serializer(updated_users, many=True)
        return Response(serializer.data)

    def get_object_or_none(self, queryset, **kwargs):
        try:
            return queryset.get(**kwargs)
        except queryset.model.DoesNotExist:
            return None
