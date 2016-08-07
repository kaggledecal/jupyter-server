# {{project_name}} vagrant configuration

# Managing multiple configurations 
boxname = 'bento/ubuntu-14.04' 
ram = 4096 
cpus = 1
base_ip = '172.16.1.'
nodes = Array.new
names=['docker-server']
names.each_with_index do |name, i|
    node = Hash.new
    node[:box] = boxname
    node[:ram] = ram
    node[:cpus] = cpus
    node[:hostname] = name
    node[:ip] = base_ip + (i + 2).to_s
    nodes.push(node)
end

# BEGIN Vagrantfile
Vagrant.configure("2") do |config|
  config.ssh.insert_key = false

  if Vagrant.has_plugin?('vagrant-cachier')
    config.cache.enable :apt
  else
    printf("** Install vagrant-cachier plugin to speedup deploy: `vagrant plugin install vagrant-cachier`.**\n")
  end

  # If hostmanager plugin is not installed, tell the user to install it.
  # We require hostmanager; our inventory files assume you have it working. Hostmanager may cause
  # difficulties with automated install, but there are directions for getting around that here:
  #   https://github.com/smdahlen/vagrant-hostmanager#passwordless-sudo
  if not Vagrant.has_plugin?('vagrant-hostmanager')
    raise "** Install vagrant-hostmanager plugin to continue: `vagrant plugin install vagrant-hostmanager`.**\n"
  end

  # Use the hostmanager plugin. Hostmanager makes it convenient to access vagrant-managed hosts by
  # name instead of by IP address. It's especially useful if we want to connect to a service on the
  # virtual box via HTTPS.
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.include_offline = true

  # https://github.com/smdahlen/vagrant-hostmanager/issues/86
  cached_addresses = {}
  config.hostmanager.ip_resolver = proc do |vm, resolving_vm|
    if cached_addresses[vm.name].nil?
      if hostname = (vm.ssh_info && vm.ssh_info[:host])
        vm.communicate.execute("ip -f inet -o addr show eth1") do |type, contents|
          cached_addresses[vm.name] = contents.split()[3][/[^\/]+/]
        end
      end
    end
    cached_addresses[vm.name]
  end

  nodes.each do |node|
    config.vm.define node[:hostname] do |node_config|
      node_config.vm.box = node[:box]
      node_config.vm.host_name = node[:hostname]
      node_config.vm.network :private_network, ip: node[:ip]
      node_config.vm.provider :virtualbox do |vb|
        vb.memory = node[:ram]
        vb.cpus = node[:cpus]
        vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        vb.customize ['guestproperty', 'set', :id, '/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold', 10000]
      end
      node_config.vm.provider "vmware_fusion" do |vb|
        vb.vmx["memsize"] = node[:ram]
        vb.vmx["numvcpus"] = node[:cpus]
      end
    end
  end
end
