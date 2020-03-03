# -*- coding: utf-8 -*-
"""
Created on Mon Feb 24 14:00:50 2020

@author: abastillasgl
"""

import random
import numpy as np
from sklearn.neighbors.dist_metrics import EuclideanDistance

size = 10
A = np.random.randint(25, 75, size)
B = np.random.randint(25, 75, size)

points = list(zip(A, B))

distance = EuclideanDistance()


def pair(array):
    """ Create unique pairings of points excluding the current pair """
    array_length = len(array)
    valid_number_of_points = array_length > 1
    
    if valid_number_of_points and array_length == 2:
        return [tuple(array)]

    elif valid_number_of_points:
        # Main algorithm
        current_pairs = list()
        current = array[0]
        subarray = array[1:]
        
        for item in subarray:
            pair_ = (current, item)
            
            if pair_ not in current_pairs:
                current_pairs.append(pair_)
        
        current_pairs.extend(pair(subarray))
        return current_pairs
        
    else:
        return None        

def calculate_distance(a, b):
    """ Calculate euclidean distance between two points """
    x = np.array(a[0] - b[0]) ** 2
    y = np.array(a[1] - b[1]) ** 2
    return np.sqrt(x + y)


if __name__=="__main__":
    pairs = pair(points)
    
    distances = {}
    minimums = {}
    new_pairs = set()
    
    for a, b in pairs:
        d = calculate_distance(a, b)
        print(a, b, d)
        
        new_point_found = a not in distances
        shorter_point_found = False if a not in distances else minimums[a] > d
        
        if new_point_found or shorter_point_found:
            distances[a] = [a, b]
            minimums[a] = d
        
    print(minimums)
            
        