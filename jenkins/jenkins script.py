import os
import subprocess
import traceback
branch_name = os.getenv('GIT_BRANCH')
build_number = os.getenv('BUILD_NUMBER')
branch_name = branch_name.replace('origin/', '')
image_name = "node_uady_sicei:" + branch_name + "-" + build_number
old_image_name = "node_uady_sicei:" + branch_name + "-" + str(int(build_number)-1)
print("---------using image name: " + image_name)
try:   
    subprocess.check_call("docker build -t "+image_name+" .", stderr=subprocess.PIPE, shell=True)
    try:
        subprocess.check_call("docker rm -f node_uady_sicei",stderr=subprocess.PIPE, shell=True)
        subprocess.check_call("docker image rm -f "+old_image_name,stderr=subprocess.PIPE, shell=True)
    except:
        print('Failed deleting existing images or containers')
        #don't fail on removing images or containers, might be first run
        print(print(traceback.format_exc()))
        pass
    subprocess.check_call("docker container run -d -e DB_HOST=host.docker.internal -e DB_PORT=3306 -e DB_USERNAME=root -e DB_PASSWORD=pa$$word1 -e DB_NAME=uady_sicei -p 8081:8080 --name node_uady_sicei "+image_name+" ",stderr=subprocess.PIPE, shell=True)
except: 
    print('Failing--------')
    print(traceback.format_exc())
    exit(1)