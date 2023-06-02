.PHONY: up down restart reboot

up:
	@docker-compose up -d

down:
	@docker-compose down

restart:
	@docker-compose restart

reboot: down up