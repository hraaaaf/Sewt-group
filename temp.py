import urllib.request, re; from bs4 import BeautifulSoup
html = urllib.request.urlopen('https://sewt-group.ma/pages/about.html').read().decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')
for img in soup.find_all('img'):
    print(img['src'], '=>', img.find_parent().text.strip()[:100])
