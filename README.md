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


### Header

```text
#ENGINE=
```

Specifies the search engine name (for example, the name of the TSV file).

```text
#URL=
```

Specifies the URL of the TSV file used for updates.

### Entries

Each entry contains four TAB-separated fields:

1. Site name displayed in search results
2. URL
3. Search keywords
4. Description displayed in the details view

Example:

```tsv
#ENGINE=Web Link A
#URL=

Site Name Example A	https://A.example	test example	test site
Site Name Example B	https://art.example.com	art illustration	Illustration site
```

# Updating TSV Files

The `update.js` script reads the URLs stored in TSV files and downloads the latest versions automatically.

`update.js` is written for Node.js.

On Windows, Node.js must be installed before using the update tool.

After installing Node.js, open a console in the project folder and run:


node update.js


The script will download updated TSV files and overwrite the local copies.








#日本語版


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

#ENGINE=

の部分には、検索エンジン名(TSVの名前など)を書きます。

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


#更新

update.jsを使うと、tsvに書いてあるURLをもとに、tsvをダウンロードして更新していきます。

update.jsはNode.jsのコードです。

windows環境の場合、Node.jsのインストールが必要です。

Node.jsがインストールされている状態で、コンソールで

node update.js

で実行できます。




