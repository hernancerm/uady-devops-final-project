#!/bin/bash

nohup bash -c '/usr/share/logstash/bin/logstash -f /usr/src/app/logs/logstash-simple.conf' & npm run start
