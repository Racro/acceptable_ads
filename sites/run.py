from detect import *
import multiprocessing

# from tranco import Tranco
# t = Tranco(cache=True, cache_dir='.tranco')
# latest_list = t.list()
# latest_list = latest_list.top(100000)
# latest_list = latest_list[99000:] # skimming sites from 99k-100k

from bs4 import BeautifulSoup
import re 
import requests
import time

def find_inner_pages(sites, updated_dict = {}):
    # href_count = {}
    legit_f = open("gen_sites/test_sites_legit_break.txt", "w")
    for site in sites:
        w_flag = 1
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0'}
            response = requests.get("http://www." + site, timeout=60, allow_redirects = True, headers=headers)
        except requests.exceptions.Timeout as e:
            print("Site timed out: ", site)
            continue
        except requests.exceptions.ConnectionError as e:
            print(f"Connection error for {site}... Trying without www option")
            try:
                w_flag = 0
                response = requests.get("http://" + site, timeout=60, allow_redirects = True, headers=headers)
            except Exception as e:
                print("without www fail: ", site)
                continue
        except Exception as e:
            print("Not reachable: ", site)
            continue
        
        if response.status_code != 200:
            print("site: ", site, "return a status code of =>", response.status_code)
            continue
        time.sleep(2)
        
        if w_flag:
            updated_dict[site] = ["http://www." + site]
        else:
            updated_dict[site] = ["http://" + site]
        legit_f.write(site)
        legit_f.write('\n')
        soup = BeautifulSoup(response.content, 'html.parser')
        href_links = []
        for link in soup.find_all('a'):
            try:
                if len(link.contents) >= 1: 
                    site_regex = "^http(s)?://www." + site 
                    if link.get('href'): 
                        if link.get("href")[:2] == '//':
                            continue 
                            # href_links.append("http:" + link.get("href"))
                        elif re.search('\..{1,4}$', link.get("href")) or re.search(',', link.get("href")):
                            continue
                        elif link.get("href")[0] == '/': 
                            href_links.append("http://www." + site + link.get("href")) 
                        elif re.search(site_regex, link.get("href")) and (not re.search("(&|\?|_)ref.*=", link.get("href"))): 
                            href_links.append(link.get("href")) 
            except Exception as e: 
                print(e)

        # href_count[site] = len(href_links)
    
    # import json
    # f = open("href_count.json", "w")
    # json.dump(href_count, f)
    # f.close()

        if len(href_links) > 10: 
            href_links = list(sorted(href_links, key=len))
            # updated_dict[site].extend(href_links[])
            updated_dict[site].extend(href_links[-3:])
    legit_f.close()
    return updated_dict

def divide_chunks(l, n):
    # looping till length l
    for i in range(0, len(l), n):
        yield l[i:i + n]

import json
import sys
import math 

# with open("../test_sites_custom.txt", "r") as f:
with open("gen_sites/test_sites_custom_break.txt", "r") as f:
    sites = f.read().splitlines()
f.close()

# try_list = ["geeksforgeeks.org", "forbes.com", "insider.com"]
# try_list = ["geeksforgeeks.org", "forbes.com", "insider.com"]
# latest_list = try_list

extn_lst = ['adblock', 'ublock', 'privacy-badger']

SIZE = 5 # number of browser windows that will open
if __name__ == "__main__":
    updated_dict = find_inner_pages(sites)
    # with open("inner_pages_custom.json", "w") as f:
    with open("break/adblock_detect/inner_pages_custom_break.json", "w") as f:
        json.dump(updated_dict, f)
    f.close()
    # with open("inner_pages_99k.json", "w") as f:
    #     json.dump(updated_dict, f)
    # f.close()
    sys.exit(0)
    latest_list = list(updated_dict.keys())
    print(len(latest_list))
    chunks_list = list(divide_chunks(latest_list, SIZE))
    # chunks_list = [try_list]
    manager = multiprocessing.Manager()
    return_dict = manager.dict()
    result_dict = {}
    for extn in extn_lst:       
        return_dict[extn] = manager.list()
        result_dict[extn] = []
        for i in range(math.ceil(len(chunks_list)/SIZE)):
            jobs = []
            for key in chunks_list[i]:
                # print(key)
                # return_dict[extn][key] = 0
                # print(return_dict)
                # sys.exit(0)
                # for site in updated_dict[key]:
                p = multiprocessing.Process(target=run, args=(updated_dict[key], extn, key, return_dict,))
                jobs.append(p)
            for job in jobs:
                job.start()

            for job in jobs:
                job.join()

        # for i in return_dict[extn]:
        #     print(i)
        for key in return_dict[extn]:
            result_dict[extn].append(key)

    print(result_dict)
    f = open("adblock_detect.json", "w")
    json.dump(result_dict, f)
    f.close()
