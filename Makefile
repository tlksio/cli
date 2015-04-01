test:
	./node_modules/mocha/bin/mocha

cover:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec
	./node_modules/.bin/gulp coveralls

lint:
	./node_modules/.bin/gulp jshint

clean:
	# Uninmplemented

dist:
	# Uninmplemented

dist-clean:
	rm -rf node_modules

all: lint test dist

.PHONY: test cover lint clean dist all
