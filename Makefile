restart:
	docker-compose restart

up:
	 docker compose up --build

down:
	docker-compose down --remove-orphans

run_cronjob:
	docker-compose exec cron-job bash -c "cd /app && python3 ./matchiq_api/api/scrape_and_save.py"

clean:
	docker container prune
