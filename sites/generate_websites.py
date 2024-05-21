from bs4 import BeautifulSoup
import re 
import requests
import time
import json

def find_inner_pages(sites, updated_dict = {}):
    # href_count = {}
    legit_f = open("legit.txt", "w")
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

        if len(href_links) > 10: 
            href_links = list(sorted(href_links, key=len))
            # updated_dict[site].extend(href_links[])
            updated_dict[site].extend(href_links[-3:])
    legit_f.close()
    return updated_dict

initial_lst = json.load(open('common_sites.json', 'r'))
updated_dict = find_inner_pages(initial_lst)

f = open('try.txt', 'w')
for key in updated_dict:
    for site in updated_dict[key]:
        f.write(site)
        f.write('\n')
f.close()
