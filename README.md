# MIni-Search-Engine-For-JavaScript
Mini Search Engine For JavaScript / サーバーに置くタイプのミニ検索システム




# Overview

This is a small search engine designed to run on a web server.

It is somewhere between a manually indexed search engine and an RSS-style directory.

The project is intended as a simple and lightweight experiment rather than a full-scale search engine.

Search data is stored in UTF-8 TSV (Tab-Separated Values) files.

People who want to publish search data can create TSV files containing links to websites they want to share and publish those TSV files online.

Search engine administrators can create their own TSV files or download TSV files published by others.

Multiple TSV files can be uploaded to the server and used as search data sources.

Each TSV file can contain its own URL, allowing it to be downloaded and updated automatically.

## Recommended Management Workflow

1. Keep a local `data` folder containing your TSV files.
2. Run `update.js` locally to update the TSV files.
3. Upload the updated `data` folder to your server.

This approach allows you to manage search data locally while keeping the server copy separate.

# Setting Up the Search Engine

Upload the following files to your web server:

* `index.html`
* `search.js`
* `data/` folder

After uploading them, the page can be used as a search engine.

A template configuration is available in the `bin/` folder of this repository.

# Managing Search Data

The `data` folder contains:

* `list.txt`
* One or more `.tsv` files

## list.txt

`list.txt` contains a list of TSV filenames.

Format:


file1.tsv
file2.tsv
file3.tsv


One line represents one TSV file.

## TSV Files

TSV files contain the actual search data.

Encoding:


UTF-8 (without BOM)



## Header Section

The beginning of each line must start with the following word:

### #ENGINE=

The `#ENGINE=` field defines the name of this search engine (or dataset name).

It needs to be the first line at the beginning of the file.

### URL=

#URL=

Specifies the URL of the TSV file used for updates.

### Entries

Each entry contains four TAB-separated fields:

1. Site name displayed in search results
2. URL
3. Search keywords
4. Description displayed in the details view

Example:

#ENGINE=Web Link A
#URL=

Site Name Example A	https://A.example	test example	test site
Site Name Example B	https://art.example.com	art illustration	Illustration site


# Updating TSV Files

The `update.js` script reads the URLs stored in TSV files and downloads the latest versions automatically.

`update.js` is written for Node.js.

On Windows, Node.js must be installed before using the update tool.

After installing Node.js, open a console in the project folder and run:


node update.js


The script will download updated TSV files and overwrite the local copies.



# Update

Using update.js, you can download and update TSV files based on the URLs written in them.

update.js is Node.js code.

For Windows environments, Node.js must be installed.

With Node.js installed, you can run it in the console with:

node update.js






# Running Locally

Because this project loads TSV files using JavaScript `fetch()`, opening `index.html` directly from the file system may not work in some browsers.

Run a local web server instead.

windows ver.

## Python

Open a command prompt in the project folder and run:

python -m http.server 8000

Then open:

http://localhost:8000/

Press Ctrl+C to stop the server.

## Node.js

Open a command prompt in the project folder and run:

npx http-server

or

npx serve .

Then open the URL shown in the console.


If it doesn't work in PowerShell,try using

npx.cmd serve .


# Tutorial (Placing a search engine on the server)

Download the contents of the "bin" folder in particular.

The "en" folder is the English version, and the "ja" folder is the Japanese version.

Let's edit the "data" folder locally.

Create a file with a suitable name and the extension .tsv.

Let's call it "test.tsv" for now.

A .tsv file is simply a text file, and the character encoding is UTF-8 without BOM.

"list.txt" is a list of TSV files in the data folder.

Add "test.tsv" to a new line.

Now, let's edit test.tsv.

#ENGINE=Test

#URL=

Set this as follows:

Enter the data you want to display in the search results in the following order, separated by a single tab:

Site Name

URL

Search Term

Description


example:

github	https://github.com/	github	github top page

A logical line is one entry. Continue entering other sites on separate lines.

Rename the HTML file "index.html" to something other than "search.html" except when testing on localhost.


Upload the contents of the edited "en" or "ja" folder to the server, and accessing the URL of search.html will make it function like a search engine.

# Tutorial 2 (Updating TSV files with a tool)

Download the contents of the "tool" folder.

"en" is for English, "ja" is for Japanese.

In your local environment, the TSV files in the "data" folder (located in the same folder as "update.js") will be used for automatic updates.

With Node.js installed, run the following command in the console within the folder containing update.js:

`node update.js`

This will update all TSV files in the "data" folder (located in the same folder as update.js).

The update check is not thorough, so some TSV files may be corrupted. If possible, perform a quick visual check of the TSV files.

Replace the "data" folder (located in the same folder as update.js) with the "data" folder on your server.



# Tutorial 3 (Providing a TSV to Others)

You can publish a TSV file online so others can use it.

In the entry section, enter the site information you want to use for the search engine.

You can think of it as a link collection for websites.

If you don't provide automatic updates,

#URL=

You can also leave #URL= blank.

If you write #URL=, enter the URL of the published TSV file if you have one.

During automatic updates, the TSV file will be re-retrieved from that URL.

When you overwrite and rewrite the TSV file at that URL,

the user who installed the TSV file can obtain the new, overwritten TSV file using an update tool.

Alternatively, users can manually download the TSV file and update it themselves without using an automatic update tool.




# 日本語版


# 概要

サーバーに置いて使うミニ検索エンジンです。

手動インデックス型のミニ検索エンジンとRSSの中間ような仕組みです。

シンプルなスクリプトで動く、おもちゃ的なものです。

検索データは、tsvと呼ばれるUTF-8のテキストで扱います。

tsvを作成、公開したい人は、tsvに検索結果に表示したいサイトを入力し、ネットで公開したりします。

検索エンジンの管理をしたい人は、tsvを作成したり、ネットからダウンロードしたりして入手します。

複数のtsvをサーバーにアップロードして、検索エンジンの検索内容に使います。

tsvは自分のURLを持つことができ、それを元にダウンロード更新することができます。

おすすめの管理方法は、

1.ローカル環境にdataフォルダ(tsvが入ったフォルダ)を持つ。

2.update.jsをローカル環境から実行し、dataフォルダを更新する。

3.更新したdataファルダをサーバーにアップロード

という風に、サーバー上のdataフォルダとは別に、ローカルでdataフォルダを管理する方法です。


# 検索エンジンの設定の仕方

dataフォルダ、index.html,search.jsをサーバーに置くと、 検索エンジンのように使えるページになります。

ひな型はgithub上では、bin/フォルダに置いてあります。


# 検索エンジンの管理側の設定

dataフォルダの中身は、

list.txtと.tsvファイルです。


list.txtはそのフォルダにあるtsvのリストです。

1行 = 1TSVファイル名

という形式で、tsvファイル名が並んだフォーマットです。

.tsvは検索用データです。

文字コードはUTF-8(BOMなし)です。

開始部分:
#で始まる文は、行の先頭から書く必要があります。


#ENGINE=

の部分には、検索エンジン名(TSVの名前など)を書きます。ファイルの1行目に書く必要があります。

#URL=

の部分に、tsvのURLを書きます(更新用)。

各エントリー本体:

1.検索結果に表示するサイト名

2.URL

3.検索ワード

4.検索結果詳細時に表示したいサイトの説明文

を半角英数字のタブで区切って書きます。

例:

#ENGINE=Web Link A

#URL=

Site Name Example A	https://A.example	test example	test site

Site Name Example B	https://art.example.com	art illustration	Illustration site


# 更新

update.jsを使うと、tsvに書いてあるURLをもとに、tsvをダウンロードして更新していきます。

update.jsはNode.jsのコードです。

windows環境の場合、Node.jsのインストールが必要です。

Node.jsがインストールされている状態で、コンソールで

node update.js

で実行できます。





# サーバーにアップロードせずhtmlを直接実行

このプログラムではjavascriptのfetch()関数を使っているため、

index.htmlをローカル環境で実行しても動作がブロックされます。

ローカルホストで実行すると、自分をサーバーにしてhtmlを実行できるようになります。

Windows環境下では次のようにします。PythonもNode.jsもインストールが必要です。


## Python

htmlを置いたフォルダで、コマンドプロンプトで次のようにします。

python -m http.server 8000

この状態で、ブラウザでURLの

http://localhost:8000/

にアクセスすると、コマンドプロンプトで指定したフォルダのindex.htmlが実行されます。

サーバーをストップするにはコマンドプロンプトでCtrl+Cキーを押します。


## Node.js

プロジェクトのフォルダ内で、コマンドプロンプトを開き、

npx http-server

または

npx serve .

URLが示されるので、ブラウザでそこへアクセスします。

power shellで動かない場合は、

npx.cmd serve .

とします。



# チュートリアル(サーバーへ検索エンジンを置く)

特に「bin」の中身をダウンロードします。

「en」フォルダは英語版、「ja」フォルダは日本語版です。

ローカルで「data」フォルダを編集してみましょう。

適当な名前で、拡張子tsvのファイルを作成します。

ここでは仮に、「test.tsv」としましょう。

tsvはただのテキストファイルで、文字コードはBOMなしUTF-8です。

「list.txt」は、dataフォルダ内のtsvファイルのリストです。

新しい行に「test.tsv」を追加しておきましょう。

test.tsvの編集に入ります。

#ENGINE=Test

#URL=

としておき、

検索に表示したいデータを

サイト名

URL

検索ワード

説明

の順にタブ1つで区切りながら入力します。

例:

github	https://github.com/?locale=ja	github	githubのトップページ

論理行は、1エントリです。改行して、他のサイトを続けて入力していきます。

HTMLの「index.html」は、ローカルホストのテスト時以外は違う名前に変えましょう。

「search.html」などに変えます。

編集済みの「en」または「ja」フォルダの中身をサーバーにアップロードし、search.htmlのURLにアクセスすれば検索エンジンのように機能します。


# チュートリアル2(tsvをツールで更新する)

「tool」フォルダの中身をダウンロードします。

「en」は英語用、「ja」は日本語用です。

ローカル環境で、「update.js」と同じフォルダにある、「data」フォルダ内のtsvファイルが自動更新の対象に使われます。

Node.jsがインストールされている状態で、update.jsがあるフォルダ内でコンソールで

node update.js

で実行します。update.jsと同じフォルダにある「data」内のtsvが、すべて更新されます。

更新時のチェックは甘いので、tsvが壊れているかもしれません。可能であれば、目視でtsvを簡単にチェックしておきましょう。

update.jsと同じフォルダ内の「data」フォルダを、サーバーに置いた「data」フォルダと入れ替えましょう。


# チュートリアル3(tsvを他人に提供する)

tsvはネットで公開したりして、他の人が使えるようにすることができます。

エントリの部分に検索エンジンの内容に使いたいサイト情報を入力します。

webサイトのリンク集のようなものと考えてもかまいません。

自動更新を提供しない場合、

#URL=

という風に、#URL=を空欄にすることもできます。

#URL=を書く場合は、公開したtsvのURLがあれば、それを書きましょう。

自動更新の際、そのURLからtsvが再取得されます。

そのURLに置いてあるtsvを上書きして書き直した際、

そのtsvを導入したユーザーは、更新ツールなどによって、上書きされた新しいtsvを取得できます。

また、ユーザー側は、自動更新ツールを用いず、

手動で自分でtsvをダウンロードしなおしてファイルを更新してもかまいません。





