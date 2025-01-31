from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def find_path(req):
    n = int(req.GET.get('n', None))
    start = req.GET.get('start', None)
    end = req.GET.get('end', None)

    start = [int(x) for x in start.split(',')]
    end = [int(x) for x in end.split(',')]

    item = get_path(n, start, end)
    if req.type == 'GET':
        return JsonResponse({'data': item})
    

def get_path(n, s, e):
    def get_sub_nodes(node):
        i, j = node
        ch = [[i, j + 1], [i + 1, j], [i, j - 1], [i - 1, j]]
        return [x for x in ch if 0 <= x[0] < n and 0 <= x[1] <= n]

    res = []
    visited = set()
    memo = {}
    def dfs(cur):
        cur_node = cur[-1]
        cur_key = (tuple(cur_node), len(cur),)
        if cur_key in memo:
            return memo[cur_key]
        if cur_node == e:
            res.append(cur[:])
        visited.add(tuple(cur_node))
        for sub_node in get_sub_nodes(cur_node):
            if tuple(sub_node) not in visited:
                memo[cur_key] = dfs(cur + [sub_node])
        visited.remove(tuple(cur_node))        
    dfs([s])
    return min(res, key= lambda item: len(item))
