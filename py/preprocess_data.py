# -*- coding: utf-8 -*-
"""
Created on Tue Feb 25 13:36:01 2020

@author: abastillasgl
"""

import pandas as pd
import numpy as np
from string import ascii_letters

path_to_data = "../resources/data/thesis_data.csv"

data = pd.read_csv(path_to_data)
data = data.iloc[:,:6]
data.columns = ['region', 'cs', 'tweet', 'lat', 'lon', 'language']


def bucket(data, column=None, by="lon", step=0.5):
    '''
    Create a new DataFrame with values in column bucketed by a coordinate.
    
    Parameters
    ----------
        data (DataFrame) : Raw data with values to bucket
        column (str) : Column name with values to bucket
        by (str) : Column name of coordinate to bucket by
        step (float, int) : Precision by which to bucket data.

    Returns
    -------
        A new Pandas DataFrame with bucketed data.
    '''
    description = data.describe()[by]

    max_by = np.ceil(description['max']) + 1
    min_by = np.floor(description['min']) - 1
    
    buckets = np.arange(min_by, max_by, step)
    
    bucketed_data = pd.cut(data[by], buckets, labels=buckets[:-1])
    
    return data.assign(**{f"{by}_" : bucketed_data})



sub = data[['region', 'cs', 'lat', 'lon']]
sub_ = bucket(sub, 'cs')
sub_ = bucket(sub_, 'cs', 'lat')
