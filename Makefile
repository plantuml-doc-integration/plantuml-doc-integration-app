.PHONY: clean-deploy

deploy: clean-deploy
	npm run build
	cp -rT build ../plantuml-doc-integration.github.io
	make -C ../plantuml-doc-integration.github.io
	@echo
	@echo "Deployed! Visit https://plantuml-doc-integration.github.io"
	@echo
	
clean: clean-deploy
	rm -rf build
	
clean-deploy:
	rm -rf ../plantuml-doc-integration-deploy/tempgit
	mv ../plantuml-doc-integration.github.io/.git ../plantuml-doc-integration-deploy/tempgit
	rm -rf ../plantuml-doc-integration.github.io
	cp -r ../plantuml-doc-integration-deploy ../plantuml-doc-integration.github.io
	rm -rf ../plantuml-doc-integration.github.io/.git
	mv ../plantuml-doc-integration.github.io/tempgit ../plantuml-doc-integration.github.io/.git
	rm -rf ../plantuml-doc-integration-deploy/tempgit