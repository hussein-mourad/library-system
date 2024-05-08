import hashlib
import os


def generate_filename(instance, filename):
    # Get the file extension
    _, ext = os.path.splitext(filename)
    # Get the file field value
    field = instance._meta.get_field(instance.IMAGE_FIELD)
    # Get the file content
    content = field.value_from_object(instance).read()
    # Generate a unique filename using SHA-256 hashing
    hash_object = hashlib.sha256(content)
    # Get the hexadecimal digest of the hash
    hex_dig = hash_object.hexdigest()
    # return the new filename
    return f"{hex_dig}{ext}"
