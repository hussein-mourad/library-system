import os

from server.settings import MEDIA_ROOT


class ImageCleanupMixin:
    pass

    def perform_destroy(self, instance):
        image = getattr(instance, instance.IMAGE_FIELD)
        if os.path.isfile(image.path):
            os.remove(image.path)
        raise Exception("")
        instance.delete()

    def perform_update(self, serializer):
        instance = serializer.instance
        old_instance = self.get_object()
        old_file_field = getattr(old_instance, instance.IMAGE_FIELD)
        new_file_field = serializer.validated_data.get(instance.IMAGE_FIELD, None)
        super().perform_update(serializer)
        instance.save()

        if not old_file_field:
            return

        if not new_file_field:
            if os.path.isfile(old_file_field.path):
                os.remove(old_file_field.path)
            return

        if os.path.isfile(old_file_field.path):
            os.remove(old_file_field.path)
