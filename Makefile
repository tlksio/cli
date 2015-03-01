reindex:
	node . --reindex

clean:
	rm -rf data

index: clean
	node ./index.js

