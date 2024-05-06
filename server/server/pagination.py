from rest_framework.pagination import PageNumberPagination


class DynamicPerPagePagination(PageNumberPagination):
    page_size_query_param = "perPage"
    max_page_size = 100
    default_page_size = 10

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                page_size = int(request.query_params[self.page_size_query_param])
                if page_size > 0:
                    return page_size
            except (KeyError, ValueError):
                pass
        return self.default_page_size
